import MenuItemModel from "../models/MenuItem";

const MenuItemRepository = {
  async getMenuItems() {
    const items = await MenuItemModel.aggregate([
      { $match: { status: "ACTIVE" } },
      {
        $group: {
          _id: "$category",
          items: {
            $push: {
              id: "$_id",
              name: "$name",
              description: "$description",
              price: "$price",
              imageUrl: "$imageUrl",
            },
          },
        },
      },
    ]);

    const itemsByCategory = items.reduce((acc, item) => {
      acc[item._id] = item.items;
      return acc;
    }, {});

    return itemsByCategory;
  },
};

export default MenuItemRepository;
