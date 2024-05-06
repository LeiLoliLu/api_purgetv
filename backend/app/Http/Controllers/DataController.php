<?php

namespace App\Http\Controllers;

use App\Models\Data;
use Illuminate\Http\Request;

class DataController extends Controller
{
    public function store(String $name, String $bio, int $user)
    {
        $data = new Data;
        $data->name = $name;
        $data->bio = $bio;
        $data->user_id=$user;
        $data->save();
    }
}
