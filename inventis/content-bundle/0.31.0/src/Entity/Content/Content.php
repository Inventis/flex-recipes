<?php
declare(strict_types=1);

namespace App\Entity\Content;

use Doctrine\ORM\Mapping as ORM;
use Inventis\Bundle\ContentBundle\Model\ContentModel;

/**
 * @ORM\Entity
 * @ORM\Table(name="content")
 * @ORM\ChangeTrackingPolicy("DEFERRED_EXPLICIT")
 */
class Content extends ContentModel
{
}
