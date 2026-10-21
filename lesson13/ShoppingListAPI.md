# Shopping List API
Create an API for managing shopping lists

## Features

- ✅ Obter listas 
- ✅ Criar lista 
- ✅ Consultar lista
- ✅ Alterar/atualizar lista
- ✅ Apagar lista
- ✅ Adicionar Item a uma lista
- ✅ Remover item de uma lista
- ✅ Alterar estado do item de uma lista


## Application Resources

- Listas - `/lists`
  - Obter listas - GET
  - Criar Lista - POST
- Lista - `/lists/{id-list}`
  - Consultar - GET
  - Apagar - DELETE
  - Alterar/Atualizar - PUT
  - Criar Item
- Items de uma lista - `/lists/{id-list}/items`
  - Adicionar - POST
- Item de uma lista `/lists/{id-list}/items/{id-item}`
  - Remover - DELETE

- Estado do Item de uma lista `/lists/{id-list}/items/{id-item}/toggle`
  - Alterar - POST
