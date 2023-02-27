# hci_api

This is simple node wrap around SANGFOR HCI API.

See the details docs on [Sangfor超融合平台API接口说明(20220106)](docs/Sangfor超融合平台API接口说明(20220106).pdf).

Only `access` and partial `vm` module is finished.

## How to use it

1. npm i -S hci_api
2. set BASE_URL, USERNAME and PASSWORD environments or you can create .env file which contains these envs.
3. import the lib via `const {add_roles, delete_roles, update_roles, get_roles, create_vm, create_vm_cluster, delete_vm, encrypt_vm} = require('hci_api')` (for CommonJS) or `import {add_roles, delete_roles, update_roles, get_roles, create_vm, create_vm_cluster, delete_vm, encrypt_vm} from 'hcp_api'` (for ESM);
4. use the imported api as you need.

## Todos

- [x] finish init project code
- [x] finish `access` module.
- [ ] finish `vm` module.
- [ ] finish `network` module.
- [ ] finish `storage` module.
- [ ] finish `management` module.
- [ ] finish `status` module.
- [ ] finish `user` module.

## License

MIT License

Copyright (c) 2023 liudonghua
