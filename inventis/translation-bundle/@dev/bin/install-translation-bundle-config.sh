resource='@InventisTranslationBundle/Resources/config/routing.yaml'
dir='./config/routes.yaml'
if ! grep -q ${resource} ${dir}; then
  echo -e "\ninventis_translation_bundle:\n\t- { resource: "${resource}" }" >> ${dir}
fi
