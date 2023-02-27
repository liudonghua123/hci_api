import { equal } from 'assert';
import { update_tickets } from '../src/common';
// import {add_roles, delete_roles, update_roles, get_roles, create_vm, create_vm_cluster, delete_vm, encrypt_vm} from '../src/index'

describe('Typescript usage suite', function () {
    it('update_ticket() should work', async () => {
        equal((await update_tickets()).ticket.length > 0, true);
    });
});