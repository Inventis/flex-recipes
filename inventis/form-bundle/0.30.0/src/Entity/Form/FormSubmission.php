<?php

declare(strict_types=1);

namespace App\Entity\Form;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Inventis\Bundle\FormBundle\Model\FormSubmission as FormSubmissionModel;
use Inventis\Bundle\FormBundle\Model\FormSubmissionAnswer;
use JMS\Serializer\Annotation as JMS;

/**
 * @ORM\Table(name="form_submissions")
 * @ORM\Entity
 *
 * @JMS\ExclusionPolicy("all")
 * @final Not explicitly made final because of Doctrine proxies, but consider it to be final BC-wise.
 */
class FormSubmission extends FormSubmissionModel
{
    /**
     * @var ArrayCollection<FormSubmissionAnswer>
     *
     * @ORM\OneToMany(
     *     targetEntity="FormSubmissionAnswer",
     *     mappedBy="submission",
     *     fetch="EAGER",
     *     orphanRemoval=true,
     *     cascade={"persist", "remove"}
     * )
     *
     * @JMS\Expose
     * @JMS\MaxDepth(1)
     */
    protected $answers;
}
