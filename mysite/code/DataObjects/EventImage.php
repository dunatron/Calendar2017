<?php

//class EventImage extends Image
class EventImage extends SilverStripe\ORM\DataExtension
{
    private static $db=array(
        'transformation_id' => 'Int'
    );

    private static $belongs_many_many = array(
        "HappEventImages"   =>  'Event'
    );


//    public static $has_one = array(
//        'Event' =>  'Event'
//    );

    public function setFilename($val) {
        $this->setField('Filename', $val);

        // "Filename" is the "master record" (existing on the filesystem),
        // meaning we have to adjust the "Name" property in the database as well.
        //$this->setField('Name', basename($val));
    }
}