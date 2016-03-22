<?php

require_once 'Mage/Checkout/controllers/CartController.php';

class Evince_Ajaxaddtocart_Checkout_CartController extends Mage_Checkout_CartController {

    public function addAction() {
        $cart = $this->_getCart();
        $params = $this->getRequest()->getParams();
        try {
            if (isset($params['qty'])) {
                $filter = new Zend_Filter_LocalizedToNormalized(
                                array('locale' => Mage::app()->getLocale()->getLocaleCode())
                );
                $params['qty'] = $filter->filter($params['qty']);
            }

            $product = $this->_initProduct();
            $related = $this->getRequest()->getParam('related_product');

         
            if (!$product) {
                $this->_goBack();
                return;
            }

            $cart->addProduct($product, $params);
            if (!empty($related)) {
                $cart->addProductsByIds(explode(',', $related));
            }

            $cart->save();

            $this->_getSession()->setCartWasUpdated(true);

            $this->getLayout()->getUpdate()->addHandle('ajaxaddtocart');
            $this->loadLayout();

            Mage::dispatchEvent('checkout_cart_add_product_complete', array('product' => $product, 'request' => $this->getRequest(), 'response' => $this->getResponse())
            );

            if (!$this->_getSession()->getNoCartRedirect(true)) {
                if (!$cart->getQuote()->getHasError()) {
                    $message = $this->__('%s was added to your shopping cart.', Mage::helper('core')->escapeHtml($product->getName()));
                    $this->_getSession()->addSuccess($message);
                }
                $this->_goBack();
            }
        } catch (Mage_Core_Exception $e) {
            $_response = Mage::getModel('ajaxaddtocart/response');
            $_response->setError(true);

            $messages = array_unique(explode("\n", $e->getMessage()));
            $json_messages = array();
            foreach ($messages as $message) {
                $json_messages[] = Mage::helper('core')->escapeHtml($message);
            }

            $_response->setMessages($json_messages);

            $url = $this->_getSession()->getRedirectUrl(true);

            $_response->send();
        } catch (Exception $e) {
            $this->_getSession()->addException($e, $this->__('Item can not be add  to shopping cart.'));
            Mage::logException($e);

            $_response = Mage::getModel('ajaxaddtocart/response');
            $_response->setError(true);
            $_response->setMessage($this->__('Item can not be add  to shopping cart.'));
            $_response->send();
        }
    }

    public function updateItemOptionsAction() {
        $cart = $this->_getCart();
        $id = (int) $this->getRequest()->getParam('id');
        $params = $this->getRequest()->getParams();

        if (!isset($params['options'])) {
            $params['options'] = array();
        }
        try {
            if (isset($params['qty'])) {
                $filter = new Zend_Filter_LocalizedToNormalized(
                                array('locale' => Mage::app()->getLocale()->getLocaleCode())
                );
                $params['qty'] = $filter->filter($params['qty']);
            }

            $quoteItem = $cart->getQuote()->getItemById($id);
            if (!$quoteItem) {
                Mage::throwException($this->__('Quote item is not found.'));
            }

            $item = $cart->updateItem($id, new Varien_Object($params));
            if (is_string($item)) {
                Mage::throwException($item);
            }
            if ($item->getHasError()) {
                Mage::throwException($item->getMessage());
            }

            $related = $this->getRequest()->getParam('related_product');
            if (!empty($related)) {
                $cart->addProductsByIds(explode(',', $related));
            }

            $cart->save();

            $this->_getSession()->setCartWasUpdated(true);

            $this->getLayout()->getUpdate()->addHandle('ajaxaddtocart');
            $this->loadLayout();

            Mage::dispatchEvent('checkout_cart_update_item_complete', array('item' => $item, 'request' => $this->getRequest(), 'response' => $this->getResponse())
            );
            if (!$this->_getSession()->getNoCartRedirect(true)) {
                if (!$cart->getQuote()->getHasError()) {
                    $message = $this->__('%s was updated in your shopping cart.', Mage::helper('core')->htmlEscape($item->getProduct()->getName()));
                    $this->_getSession()->addSuccess($message);
                }
                $this->_goBack();
            }
        } catch (Mage_Core_Exception $e) {
            $_response = Mage::getModel('ajaxaddtocart/response');
            $_response->setError(true);

            $messages = array_unique(explode("\n", $e->getMessage()));
            $json_messages = array();
            foreach ($messages as $message) {
                $json_messages[] = Mage::helper('core')->escapeHtml($message);
            }

            $_response->setMessages($json_messages);

            $url = $this->_getSession()->getRedirectUrl(true);

            $_response->send();
        } catch (Exception $e) {
            $this->_getSession()->addException($e, $this->__('Cannot update the item.'));
            Mage::logException($e);

            $_response = Mage::getModel('ajaxaddtocart/response');
            $_response->setError(true);
            $_response->setMessage($this->__('Cannot update the item.'));
            $_response->send();
        }
    }

    public function deleteAction() {
        $id = (int) $this->getRequest()->getParam('id');
        if ($id) {
            try {
                $this->_getCart()->removeItem($id)
                        ->save();
            } catch (Exception $e) {
                $_response = Mage::getModel('ajaxaddtocart/response');
                $_response->setError(true);
                $_response->setMessage($this->__('Cannot remove the item.'));
                $_response->send();

                Mage::logException($e);
            }
        }

        $_response = Mage::getModel('ajaxaddtocart/response');

        $_response->setMessage($this->__('Item was Successfully removed.'));

       $this->getLayout()->getUpdate()->addHandle('ajaxaddtocart');
        $this->loadLayout();

        $_response->addUpdatedBlocks($_response);

        $_response->send();
    }

}