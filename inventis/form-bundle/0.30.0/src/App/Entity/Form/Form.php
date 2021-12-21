<?php

declare(strict_types=1);

namespace App\Entity\Form;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Inventis\Bundle\FormBundle\Metadata\Model\MetadataAwareTrait;
use Inventis\Bundle\FormContentBridgeBundle\Model\SuccessPageAwareInterface;
use Inventis\Bundle\FormContentBridgeBundle\Model\SuccessPageAwareTrait;
use Inventis\Bundle\FormBundle\Model\Form as FormModel;
use Knp\DoctrineBehaviors\Model\Translatable\TranslatableTrait;
use JMS\Serializer\Annotation as JMS;

/**
 * @ORM\Table(name="forms")
 * @ORM\Entity
 *
 * @final Not explicitly made final because of Doctrine proxies, but consider it to be final BC-wise.
 */
class Form extends FormModel
{
    use TranslatableTrait, MetadataAwareTrait;

    public function translate(?string $locale = null, $fallbackToDefault = true): FormTranslation
    {
        /** @var FormTranslation $translation */
        $translation = $this->doTranslate($locale, $fallbackToDefault);
        return $translation;
    }

    /**
     * @var ArrayCollection ArrayCollection<FormField>
     *
     * @ORM\OneToMany(targetEntity="FormField", mappedBy="form", orphanRemoval=true, fetch="EAGER")
     *
     * @JMS\Expose
     * @JMS\MaxDepth(1)
     */
    protected $fields;

    /**
     * @var ArrayCollection ArrayCollection<FormSubmission>
     *
     * @ORM\OneToMany(targetEntity="FormSubmission", mappedBy="form")
     *
     * @JMS\Expose
     * @JMS\MaxDepth(1)
     */
    protected $submissions;

    /**
     * @var ArrayCollection ArrayCollection<FormReceiver>
     *
     * @ORM\ManyToMany(targetEntity="FormReceiver", inversedBy="receivers")
     *
     * @JMS\Expose
     * @JMS\MaxDepth(1)
     */
    protected $receivers;
}
