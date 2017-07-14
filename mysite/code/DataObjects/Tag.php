<?php
/**
 * Created by PhpStorm.
 * User: Heath
 * Date: 12/09/16
 * Time: 7:05 PM
 */
class Tag extends DataObject
{

    private static $has_one = array();
    
    private static $db = array(
        'Title' => 'Varchar(20)',
        'Description' => 'Text'
    );

    public function getCMSFields(){
        $fields = parent::getCMSFields();
        return $fields;
    }
    
}