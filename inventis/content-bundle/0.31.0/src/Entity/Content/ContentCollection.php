<?php
declare(strict_types=1);

namespace App\Entity\Content;

use Doctrine\ORM\Mapping as ORM;
use Inventis\Bundle\ContentBundle\Model\ContentCollectionModel;

/**
 * @ORM\Entity
 * @ORM\Table(name="content_collection")
 * @ORM\ChangeTrackingPolicy("DEFERRED_EXPLICIT")
 */
class ContentCollection extends ContentCollectionModel
{
}
