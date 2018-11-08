resource='@InventisWebadminBundle/Resources/config/security.yml'
dir='./config/packages/security.yaml'
if ! grep -q ${resource} ${dir}; then
  echo -e "\nimports:\n\t- { resource: "${resource}" }" >> ${dir}
fi


resource='@InventisWebadminBundle/Resources/config/routing.yml'
dir='./config/routes.yaml'
if ! grep -q ${resource} ${dir}; then
  echo -e "\nimports:\n\t- { resource: "${resource}" }" >> ${dir}
fi