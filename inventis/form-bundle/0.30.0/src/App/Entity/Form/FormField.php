<?php

declare(strict_types=1);

namespace App\Entity\Form;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Inventis\Bundle\FormBundle\Metadata\Model\MetadataAwareTrait;
use Inventis\Bundle\FormBundle\Model\FormField as FormFieldModel;
use Knp\DoctrineBehaviors\Model\Translatable\TranslatableTrait;

/**
 * @ORM\Table(name="form_fields")
 * @ORM\Entity
 *
 * @final Not explicitly made final because of Doctrine proxies, but consider it to be final BC-wise.
 */
class FormField extends FormFieldModel
{
    use TranslatableTrait, MetadataAwareTrait;

    /**
     * @param string|null $locale
     * @param bool $fallbackToDefault
     *
     * @return FormFieldTranslation
     */
    public function translate($locale = null, $fallbackToDefault = true): FormFieldTranslation
    {
        /** @var FormFieldTranslation $fieldTranslation */
        $fieldTranslation = $this->doTranslate($locale, $fallbackToDefault);
        return $fieldTranslation;
    }

    /**
     * @var ArrayCollection ArrayCollection<FormFieldChoice>
     *
     * @ORM\OneToMany(
     *     targetEntity="FormFieldChoice",
     *     mappedBy="formField",
     *     fetch="EAGER",
     *     orphanRemoval=true,
     *     cascade={"persist","remove"}
     * )
     */
    protected $choices;
}
