<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'is_purged',
        'purge_id'
    ];

    public function purge(){
        return $this->belongsTo(Purge::class);
    }
    public function likes(){
        return $this->belongsToMany('App\Models\User');
    }
    public function user(){
        return $this->belongsTo('App\Models\User');
    }
    public function files(){
        return $this->hasMany(File::class);
    }
}
