<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 9/02/17
 * Time: 2:47 PM
 */
class RestrictionAdmin extends ModelAdmin
{
    /**
     * @var array
     */
    private static $managed_models = array('EventRestriction');

    /**
     * @var string
     */
    private static $url_segment = "restrictions";

    /**
     * @var string
     */
    private static $menu_title = "Restrictions";

    /**
     * @param null $id
     * @param null $fields
     * @return \Form
     */
    public function getEditForm($id = null, $fields = null)
    {
        $form = parent::getEditForm($id, $fields);

        $gridField = $form->Fields()
            ->fieldByName($this->sanitiseClassName($this->modelClass));

        $config = $gridField->getConfig();

        $config->getComponentByType('GridFieldPaginator')->setItemsPerPage(20);
        $config->getComponentByType('GridFieldDataColumns')
            ->setDisplayFields(array(
                'Description'    =>  'Restriction Type'
            ));

        return $form;
    }


}