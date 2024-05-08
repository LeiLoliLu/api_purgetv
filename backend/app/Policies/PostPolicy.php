<?php
namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PostPolicy{
    use HandlesAuthorization;

    //role_id 1 = admin
    //role_id 0 = user normal
    public function before(User $user, string $ability)
    {
        if( $user->role_id==1){
            return true;
        }
    }
    public function update(User $user,Post $post){
        return $user->role_id==0 && $post->user_id==$user->id;
    }
    public function delete(User $user,Post $post){
        return $user->role_id==0 && $post->user_id==$user->id;
    }
    public function like(User $user, Post $post){
        return $user->id!=$post->user_id;
    }

}
