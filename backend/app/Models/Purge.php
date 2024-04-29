<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purge extends Model
{
    use HasFactory;
    protected $fillable = ['id','fase','titulo','fecha_fin'];

    public function posts(){
        return $this->hasMany('App\Models\Post');
    }
    public function files(){
        return $this->hasMany(File::class);
    }
}
