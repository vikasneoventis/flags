<?php

class Raveinfosys_Exporter_Adminhtml_ImporterController extends Mage_Adminhtml_Controller_Action
{
	protected function _initAction()
	{
		$this->loadLayout()
			->_setActiveMenu('exporter/items')
			->_addBreadcrumb(Mage::helper('adminhtml')->__('Orders Import'), Mage::helper('adminhtml')->__('Orders Import'));
		
		return $this;
	}   
 
	public function indexAction() 
	{
		$this->_initAction()
			->renderLayout();
	}
	
	public function importOrdersAction() 
	{
		set_time_limit(0);
		ini_set('memory_limit', '1024M');
		$_FILES['order_csv']['name'] ='test';	
	   if($_FILES['order_csv']['name'] != '') {
		    $data = $this->getRequest()->getPost();
			try {	
				/*$uploader = new Varien_File_Uploader('order_csv');
				$uploader->setAllowedExtensions(array('csv'));
				$uploader->setAllowRenameFiles(false);
				$uploader->setFilesDispersion(false);
				$path = Mage::getBaseDir('media') . DS.'raveinfosys/exporter/import/';
				$uploader->save($path, $_FILES['order_csv']['name'] );*/
				//$path.$_FILES['order_csv']['name'],$data
				$csv = Mage::getModel('exporter/importorders')->readCSV('var/import/orders.csv',$data);
				
			} catch (Exception $e) {
				Mage::getModel('core/session')->addError(Mage::helper('exporter')->__('Invalid file type!!'));
		  
			}
		  
		   $this->_redirect('*/*/');
		}
		else {
		   Mage::getSingleton('adminhtml/session')->addError(Mage::helper('exporter')->__('Unable to find the import file'));
           $this->_redirect('*/*/');
		}
		
	}
}