<?php
namespace App\Helpers;
trait Helper
{
    public function slugify($string)
    {
        return str_replace(array(" ", '_', '-', ',','#', '$', '&', '@', '*', '^', '"', "'"), '-', $string);
    }
}
