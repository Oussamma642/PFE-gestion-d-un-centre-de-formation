<?php
namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Models\Role;


class AuthController extends Controller
{

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
    
        // Retrieve role ID from the roles table
        $roleId = Role::where('name', $credentials['role'])->value('id'); 
    
        if (!$roleId) {
            return response()->json([
                'message' => 'Invalid role provided',
            ], 400);
        }
        
    

        // Find the user with the given email, password (not hashed), and role
        $user = User::where('email', $credentials['email'])
            ->where('password', $credentials['password']) // Not secure for production
            ->where('role_id', $roleId)
            ->first();
    
        // If no user is found, return an error response
        if (!$user) {
            return response()->json([
                'message' => 'Provided email, password, or role is incorrect',
            ], 401);
        }
    
        // Generate API token
        $token = $user->createToken('main')->plainTextToken;
    
        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 200);
    }
    
    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}