<?php

namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ImageHelper
{


    public static function uploadImage(Request $request)
    {
        $path = '';
        if ($request->hasFile('thumbnail')) {
            $imageName = time() . '.' . $request->thumbnail->extension();
            $image = $request->thumbnail->storeAs('images', $imageName, 'public');
            $path = $image;
        } else if (is_string($request->thumbnail)) {
            $path = $request->thumbnail;
        } else {
            $path = 'images/default.png';
        }
        return $path;
    }

    public static function uploadImageContent(Request $request)
    {
        $path = '';
        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $image = $request->image->storeAs('images', $imageName, 'public');
            $path = $image;
        } else if (is_string($request->image)) {
            $path = $request->image;
        } else {
            $path = 'images/default.png';
        }
        return $path;
    }
}
