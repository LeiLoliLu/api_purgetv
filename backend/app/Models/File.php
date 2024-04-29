<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    protected $fillable = ['name','file_path','post_id','purge_id','data_id'];

    public function post(){
        return $this->belongsTo(Post::class);
    }
    public function purge(){
        return $this->belongsTo(Purge::class);
    }
    public function data(){
        return $this->belongsTo(Data::class);
    }
}
