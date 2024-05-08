<?php

namespace App\Http\Controllers;

use App\Models\Purge;
use Illuminate\Http\Request;

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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Purge $purge)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Purge $purge)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Purge $purge)
    {
        //
    }
}
