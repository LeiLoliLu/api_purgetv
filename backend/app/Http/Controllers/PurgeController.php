<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Purge;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PurgeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $purges = Purge::with('files')->get();
        return $purges;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|max:255',
            'file' => 'required',
            'fecha_fin' => 'required',
            'fase' => 'required',
            'purge_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        try {
            $purge = new Purge();
            $purge->titulo = $request->input('titulo');
            $purge->fecha_fin = Carbon::parse($request->input('fecha_fin'));
            $purge->fase = intval($request->input('fase'));
            $purge->id = intval($request->input('purge_id'));


            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move('storage/', $filename);
                $fileModel = new File([
                    'name' => $filename,
                    'file_path' => 'storage/' . $filename,
                ]);
                $purge->files()->save($fileModel);
            }
                $purge->save();


            // Devolver una respuesta exitosa
            return response()->json(['message' => 'Purge created successfully', 'purge' => $purge], 201);
        } catch (\Throwable $th) {
            // Capturar cualquier error y devolver una respuesta de error
            return response()->json(['message' => 'The purge could not be created','error'=>$th], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $purge = Purge::with('files','posts.user.data','posts.files')->findOrFail($id); // Incluir los datos de la purga junto con los datos del usuario y su información adicional
        return response()->json($purge);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $purge = Purge::findOrFail($id);

            $res = $purge->update($request->all());

            if ($res) {
                return response()->json(['message' => 'Pureg actualizado satisfactoriamente', 'purge' => $purge], 200);
            } else {
                return response()->json(['message' => 'Error actualizando el purge'], 500);
            }
        } catch (\Exception $exception) {
            return response()->json(['message' => 'Error actualizando el purge: ' . $exception->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Request $request, $id)
    {
        $purge = Purge::findOrFail($id);
        $res = $purge->delete();
        if ($res) {
            return response()->json(['message' => 'Purge deleted succesfully'], 201);
        }
        return response()->json(['message' => 'Error deleting purge'], 500);
    }
}
