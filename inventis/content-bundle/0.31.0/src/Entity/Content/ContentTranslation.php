<?php
declare(strict_types=1);

namespace App\Entity\Content;

use Doctrine\ORM\Mapping as ORM;
use Inventis\Bundle\ContentBundle\Model\ContentTranslationModel;

/**
 * @ORM\Entity
 * @ORM\Table(name="content_translation")
 * @ORM\ChangeTrackingPolicy("DEFERRED_EXPLICIT")
 */
class ContentTranslation extends ContentTranslationModel
{
}
