<?php

/**
 * Created by PhpStorm.
 * User: admin
 * Date: 7/12/16
 * Time: 5:08 PM
 */
class AccessTypeArray
{

    public function getAccessValues()
    {
        $types = OptionsetField::create(
            'AccessType',
            'choose an Access Type',
            array(
                '1' => 'Free event',
                '2' => 'Door sales only',
                '3' => 'Sell tickets using Eventfinda',
                '4' => 'Attendees must register for this free event using Eventfinda',
                '5' => 'People must buy tickets to this event from another website',
            ), 1

        );
        // Vue does'nt support this type
//            ->setAttribute('v-model', 'AccessType')
//            ->setAttribute('v-validate', 'AccessType')
//            ->setAttribute('data-vv-rules', 'required')
//            ->setRightTitle('AccessType');
        return $types;
    }

}