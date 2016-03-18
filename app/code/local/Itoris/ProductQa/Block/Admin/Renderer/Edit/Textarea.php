<?php
/**
 * ITORIS
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the ITORIS's Magento Extensions License Agreement
 * which is available through the world-wide-web at this URL:
 * http://www.itoris.com/magento-extensions-license.html
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to sales@itoris.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade the extensions to newer
 * versions in the future. If you wish to customize the extension for your
 * needs please refer to the license agreement or contact sales@itoris.com for more information.
 *
 * @category   ITORIS
 * @package    ITORIS_PRODUCTQA
 * @copyright  Copyright (c) 2014 ITORIS INC. (http://www.itoris.com)
 * @license    http://www.itoris.com/magento-extensions-license.html  Commercial License
 */

class Itoris_ProductQa_Block_Admin_Renderer_Edit_Textarea extends Mage_Adminhtml_Block_Widget_Grid_Column_Renderer_Text {

	public function render(Varien_Object $row) {
		$html = '<div><textarea rows="4" name="answer['. $row->getId() .']['. $this->getColumn()->getId() .']"
				style="width: 98%; margin: 7px auto;">'. htmlentities($row->__call($this->getColumn()->getGetter(), null), ENT_QUOTES, 'UTF-8') .'</textarea></div>
		';
		return $html;
	}
}
?>