<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        // Find the user with the given email, password (not hashed), and role
        $user = User::where('email', $credentials['email'])
            ->where('password', $credentials['password']) // Not secure for production
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


    /*
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        // Find the user with the given email
        $user = User::where('email', $credentials['email'])->first();

        // Check if the user exists and if the hashed password matches
        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'Provided email or password is incorrect',
            ], 401);
        }

        // Generate API token
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 200);
    }

    */

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }

}