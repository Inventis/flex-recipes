<?php

declare(strict_types=1);

namespace App\Entity\Form;

use Doctrine\ORM\Mapping as ORM;
use Inventis\Bundle\FormBundle\Model\FormFieldChoiceTranslation as FormFieldChoiceTranslationModel;
use Knp\DoctrineBehaviors\Model\Translatable\TranslationTrait;

/**
 * @ORM\Table(name="form_field_choice_translations")
 * @ORM\Entity
 *
 * @final Not explicitly made final because of Doctrine proxies, but consider it to be final BC-wise.
 */
class FormFieldChoiceTranslation extends FormFieldChoiceTranslationModel
{
    use TranslationTrait;

    public function __construct()
    {
        $this->locale = '';
        parent::__construct();
    }
}
