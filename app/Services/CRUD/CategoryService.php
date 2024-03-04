<?php

namespace App\Services\CRUD;

use App\Models\Category;
use Illuminate\Support\Facades\DB;

class CategoryService
{
    public function create ($data)
    {
        DB::beginTransaction();
        try {
            $comment = Category::create($data);
            DB::commit();
            return $comment;
        } catch (\Exception $e) {
            DB::rollBack();
            return $e->getMessage();
        }

    }

    public function update ($id, $data)
    {
        DB::beginTransaction();
        try {
            $comment =  Category::where('id', $id)->update($data);
            DB::commit();
            return  $comment;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function delete ($id)
    {
        DB::beginTransaction();
        try {
            $comment =  Category::where('id', $id)->delete();
            DB::commit();
            return  $comment;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function get ($id)
    {
        return Category::where('id', $id)->first();
    }
}
