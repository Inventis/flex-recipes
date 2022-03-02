<?php

declare(strict_types=1);

namespace App\Entity\Form;

use Doctrine\ORM\Mapping as ORM;
use Inventis\Bundle\FormBundle\Metadata\Model\MetadataAwareTrait;
use Inventis\Bundle\FormBundle\Model\FormTranslation as FormTranslationModel;
use Knp\DoctrineBehaviors\Model\Translatable\TranslationTrait;

/**
 * @ORM\Table(name="form_translations")
 * @ORM\Entity
 *
 * @final Not explicitly made final because of Doctrine proxies, but consider it to be final BC-wise.
 */
class FormTranslation extends FormTranslationModel
{
    use TranslationTrait, MetadataAwareTrait;

    public function __construct()
    {
        $this->locale = '';
        parent::__construct();
    }
}
