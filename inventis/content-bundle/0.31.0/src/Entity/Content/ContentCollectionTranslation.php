<?php
declare(strict_types=1);

namespace App\Entity\Content;

use Doctrine\ORM\Mapping as ORM;
use Inventis\Bundle\ContentBundle\Model\ContentCollectionTranslationModel;

/**
 * @ORM\Entity
 * @ORM\Table(name="content_collection_translation")
 * @ORM\ChangeTrackingPolicy("DEFERRED_EXPLICIT")
 */
class ContentCollectionTranslation extends ContentCollectionTranslationModel
{
}
