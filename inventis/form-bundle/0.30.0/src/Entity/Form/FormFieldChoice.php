<?php

declare(strict_types=1);

namespace App\Entity\Form;

use Doctrine\ORM\Mapping as ORM;
use Inventis\Bundle\FormBundle\Model\FormFieldChoice as FormFieldChoiceModel;
use Knp\DoctrineBehaviors\Model\Translatable\TranslatableTrait;

/**
 * @ORM\Table(name="form_field_choices")
 * @ORM\Entity
 *
 * @final Not explicitly made final because of Doctrine proxies, but consider it to be final BC-wise.
 */
class FormFieldChoice extends FormFieldChoiceModel
{
    use TranslatableTrait;

    /**
     * @param string|null $locale
     * @param bool $fallbackToDefault
     *
     * @return FormFieldChoiceTranslation
     */
    public function translate($locale = null, $fallbackToDefault = true): FormFieldChoiceTranslation
    {
        /** @var FormFieldChoiceTranslation $choiceTranslation */
        $choiceTranslation = $this->doTranslate($locale, $fallbackToDefault);
        return $choiceTranslation;
    }
}
