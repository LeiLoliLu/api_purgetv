<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Data extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'bio',
    ];

    public function user(){
        return $this->belongsTo('App\Models\User');
    }
    public function files(){
        return $this->hasMany(File::class);
    }
}
