<?php

class MyISAMExtension extends DataExtension
{
    private static $create_table_options = array(
        'MySQLSchemaManager'    =>  'ENGINE=MyISAM'
    );
}