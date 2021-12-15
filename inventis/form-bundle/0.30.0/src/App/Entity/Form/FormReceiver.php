<?php

declare(strict_types=1);

namespace App\Entity\Form;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Inventis\Bundle\FormBundle\Model\Form;
use Inventis\Bundle\FormBundle\Model\FormReceiver as FormReceiverModel;
use Inventis\Bundle\FormBundle\Model\FormSubmission;

/**
 * @ORM\Table(name="form_receivers")
 * @ORM\Entity
 *
 * @final Not explicitly made final because of Doctrine proxies, but consider it to be final BC-wise.
 */
class FormReceiver extends FormReceiverModel
{
    /**
     * @var Collection<Form>
     *
     * @ORM\ManyToMany(targetEntity="Form", mappedBy="receivers")
     * @ORM\JoinTable(name="form_receivers_forms",
     *      joinColumns={@ORM\JoinColumn(referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(referencedColumnName="id")}
     * )
     */
    protected Collection $forms;

    /**
     * @var Collection<FormSubmission>
     *
     * @ORM\ManyToMany(targetEntity="FormSubmission", mappedBy="receivers")
     * @ORM\JoinTable(name="form_receivers_form_submissions",
     *      joinColumns={@ORM\JoinColumn(referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(referencedColumnName="id")}
     * )
     */
    protected Collection $formSubmissions;
}
