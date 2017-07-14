<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 9/02/17
 * Time: 2:36 PM
 */
class TagAdmin extends ModelAdmin
{
    /**
     * @var array
     */
    private static $managed_models = array('Tag');

    /**
     * @var string
     */
    private static $url_segment = "tags";

    /**
     * @var string
     */
    private static $menu_title = "Tags";

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
                'Title'  => 'Tag Title',
                'Description'    =>  'Tag Description'
            ));

        return $form;
    }


}