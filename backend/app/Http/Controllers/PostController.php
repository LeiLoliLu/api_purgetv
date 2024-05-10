<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Post;
use App\Models\Purge;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show']]);
    }

    public function index()
    {
        $posts = Post::with('user.data', 'purge.files', 'files')->get();
        return $posts;
    }

    public function myindex()
    {
        try {
            $user = Auth::user();
            $posts = Post::where('user_id', $user->id)
                ->with('user.data', 'purge.files', 'files')
                ->get();
            return $posts;
        } catch (\Exception $exception) {
            return back()->withErrors($exception->getMessage())->withInput();
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        try {

            $post = new Post();
            if ($request->has('purge_id')) {
                $id = intval($request->input('purge_id'));
                if ($id) {
                    $purge = Purge::findOrFail($id);
                    $post->purge_id = $id;
                    $post->purge()->associate($purge);
                }
            }else{
                $post->purge_id = null;
            }

            $post->content = $request->input('content');
            $post->likeados = 0;
            $post->is_purged = 0;

            $user = Auth::user();
            $post->user()->associate($user);
            $user->posts()->save($post);

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move('storage/', $filename);
                $fileModel = new File([
                    'name' => $filename,
                    'file_path' => 'storage/' . $filename,
                ]);
                $post->files()->save($fileModel);
            }

            // Devolver una respuesta exitosa
            return response()->json(['message' => 'Post created successfully', 'post' => $post], 201);
        } catch (\Throwable $th) {
            // Capturar cualquier error y devolver una respuesta de error
            return response()->json(['message' => 'The post could not be created', 'error'=>$th], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $post = Post::with('user.data', 'purge.files','files')->findOrFail($id); // Incluir los datos de la purga junto con los datos del usuario y su información adicional
        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $post = Post::findOrFail($id);

            if ($request->user()->cannot('update', $post)) {
                return response()->json(['message' => 'No estás autorizado para actualizar este post'], 403);
            }

            $res = $post->update($request->all());

            if ($res) {
                return response()->json(['message' => 'Post actualizado satisfactoriamente', 'post' => $post], 200);
            } else {
                return response()->json(['message' => 'Error actualizando el post'], 500);
            }
        } catch (\Exception $exception) {
            return response()->json(['message' => 'Error actualizando el post: ' . $exception->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $res = $post->delete();
        if ($res) {
            return response()->json(['message' => 'Post deleted succesfully'], 201);
        }
        return response()->json(['message' => 'Error deleting post'], 500);
    }

    public function like(Request $request, $id)
    {
        try {
            $post = Post::findOrFail($id);
            $user = Auth::user();
            foreach ($post->likes as $like) {
                if ($like->id == $user->id) {
                    return response()->json(['error' => 'Ya has dado Me gusta a este post'], 400);
                }
            }
            $user_id = [$user->id];
            $post->likes()->attach($user_id);
            $post->likeados++;
            $post->save();
            return response()->json(['message' => 'Post liked successfully', 'post' => $post], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'The post could not be liked'], 500);
        }
    }
}
