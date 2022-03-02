<?php

declare(strict_types=1);

namespace App\Entity\Form;

use Doctrine\ORM\Mapping as ORM;
use Inventis\Bundle\FormBundle\Metadata\Model\MetadataAwareTrait;
use Inventis\Bundle\FormBundle\Model\FormFieldTranslation as FormFieldTranslationModel;
use Knp\DoctrineBehaviors\Model\Translatable\TranslationTrait;

/**
 * @ORM\Table(name="form_field_translations")
 * @ORM\Entity
 *
 * @final Not explicitly made final because of Doctrine proxies, but consider it to be final BC-wise.
 */
class FormFieldTranslation extends FormFieldTranslationModel
{
    use TranslationTrait, MetadataAwareTrait;
}
