export interface ItemRequestDTO {
    item_name: string;
    inventory: number;
    price: number;
    description: string;
  }
  
  export interface ItemResponseDTO {
    id: string;
    item_name: string;
    inventory: number;
    price: number;
    description: string;
  }
  
  export interface IItemService {
    /**
     * retrieve the Item with the given id
     * @param id Item id
     * @returns requested Item
     * @throws Error if retrieval fails
     */
    getItem(id: string): Promise<ItemResponseDTO>;
  
    /**
     * retrieve all Entities
     * @param
     * @returns returns array of Entities
     * @throws Error if retrieval fails
     */
    getItems(): Promise<ItemResponseDTO[]>;
  
    /**
     * create an Item with the fields given in the DTO, return created Item
     * @param Item user's email
     * @returns the created Item
     * @throws Error if creation fails
     */
    createItem(item: ItemRequestDTO): Promise<ItemResponseDTO>;
  
    /**
     * update the Item with the given id with fields in the DTO, return updated Item
     * @param id item id
     * @param item Updated item
     * @returns the updated item
     * @throws Error if update fails
     */
    updateItem(
      id: string,
      Item: ItemRequestDTO,
    ): Promise<ItemResponseDTO | null>;
  
    /**
     * delete the Item with the given id
     * @param id Item id
     * @throws Error if deletion fails
     */
    deleteItem(id: string): Promise<void>;
  }
  