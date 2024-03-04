<?php

namespace App\Services\CRUD;

use App\Models\Tag;
use Exception;
use Illuminate\Support\Facades\DB;

class TagService
{
    /**
     * @throws Exception
     */
    public function create ($data)
    {
        DB::beginTransaction();
        try {
            $comment = Tag::create($data);
            DB::commit();
            return $comment;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }

    }

    /**
     * @throws Exception
     */
    public function update ($id, $data)
    {
        DB::beginTransaction();
        try {
            $comment =  Tag::where('id', $id)->update($data);
            DB::commit();
            return  $comment;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @throws Exception
     */
    public function delete ($id)
    {
        DB::beginTransaction();
        try {
            $comment =  Tag::where('id', $id)->delete();
            DB::commit();
            return  $comment;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function get ($id)
    {
        return Tag::where('id', $id)->first();
    }
}
