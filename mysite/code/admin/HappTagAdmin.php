<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 9/02/17
 * Time: 2:36 PM
 */
class HappTagAdmin extends ModelAdmin
{
    /**
     * @var array
     */
    private static $managed_models = array('HappTag');

    /**
     * @var string
     */
    private static $url_segment = "happtags";

    /**
     * @var string
     */
    private static $menu_title = "HappTags";

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
                'Title'  => 'HappTag Title',
                'Description'    =>  'HappTag Description'
            ));

        return $form;
    }


}