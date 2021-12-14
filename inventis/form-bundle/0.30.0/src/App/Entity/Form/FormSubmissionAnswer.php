<?php

declare(strict_types=1);

namespace App\Entity\Form;

use Doctrine\ORM\Mapping as ORM;
use Inventis\Bundle\FormBundle\Model\FormSubmissionAnswer as FormSubmissionModel;

/**
 * @ORM\Table(name="form_submission_answers")
 * @ORM\Entity
 *
 * @final Not explicitly made final because of Doctrine proxies, but consider it to be final BC-wise.
 */
class FormSubmissionAnswer extends FormSubmissionModel
{
}
