import PgItem from "../../models/item.model";
import {
  IItemService,
  ItemRequestDTO,
  ItemResponseDTO,
} from "../interfaces/IItemService";
import Logger from "../../utilities/logger";

class ItemService implements IItemService {
  /* eslint-disable class-methods-use-this */
  async getItem(id: string): Promise<ItemResponseDTO> {
    let item: PgItem | null;
    try {
      item = await PgItem.findByPk(id, { raw: true });
      if (!item) {
        throw new Error(`Item id ${id} not found`);
      }
    } catch (error) {
      Logger.error(`Failed to get item. Reason = ${error.message}`);
      throw error;
    }

    return {
      id: item.id,
      item_name: item.item_name,
      inventory: item.inventory,
      price: item.price,
      description: item.description,
    };
  }

  async getItems(): Promise<ItemResponseDTO[]> {
    try {
      const items: Array<PgItem> = await PgItem.findAll({ raw: true });
      return items.map((item) => ({
        id: item.id,
        item_name: item.item_name,
        inventory: item.inventory,
        price: item.price,
        description: item.description,
      }));
    } catch (error) {
      Logger.error(`Failed to get entities. Reason = ${error.message}`);
      throw error;
    }
  }

  async createItem(item: ItemRequestDTO): Promise<ItemResponseDTO> {
    let newItem: PgItem | null;
    try {
      newItem = await PgItem.create({
        item_name: item.item_name,
        inventory: item.inventory,
        price: item.price,
        description: item.description,
      });
    } catch (error) {
      Logger.error(`Failed to create item. Reason = ${error.message}`);
      throw error;
    }
    return {
      id: newItem.id,
      item_name: item.item_name,
      inventory: item.inventory,
      price: item.price,
      description: item.description,
    };
  }

  async updateItem(
    id: string,
    item: ItemRequestDTO,
  ): Promise<ItemResponseDTO | null> {
    let resultingItem: PgItem | null;
    let updateResult: [number, PgItem[]] | null;
    try {
      updateResult = await PgItem.update(
        {
            item_name: item.item_name,
            inventory: item.inventory,
            price: item.price,
            description: item.description,
        },
        { where: { id }, returning: true },
      );

      if (!updateResult[0]) {
        throw new Error(`Item id ${id} not found`);
      }
      [, [resultingItem]] = updateResult;
    } catch (error) {
      Logger.error(`Failed to update item. Reason = ${error.message}`);
      throw error;
    }
    return {
      id: resultingItem.id,
      item_name: item.item_name,
      inventory: item.inventory,
      price: item.price,
      description: item.description,
    };
  }

  async deleteItem(id: string): Promise<void> {
    try {
      const deletedItem: number | null = await PgItem.destroy({
        where: { id },
      });

      if (!deletedItem) {
        throw new Error(`Item id ${id} not found`);
      }
    } catch (error) {
      Logger.error(`Failed to delete item. Reason = ${error.message}`);
      throw error;
    }
  }
}

export default ItemService;
