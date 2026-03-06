const stores = require("./stores.json");
const categories = require("./categories.json");
const category1 = require("./category1.json");
const product1 = require("./product1.json");
const productPage1 = require("./productPage1.json");
const productLive1 = require("./productLive1.json");
const productLiveChar1 = require("./productLiveChar1.json");
const productGroups = require("./productGroups.json");
const productSimilar = require("./productSimilar.json");
const productRelated = require("./productRelated.json");
const lastViewed = require("./lastViewed.json");
const lastViewedPage = require("./lastViewedPage.json");
const catalog = require("./catalog.json");
const catalogProdCount = require("./catalogProdCount.json");
const mainCategories = require("./mainCategories.json");
const productReview = require("./productReview.json");
const search = require("./search.json");
const productLike = require("./productLike.json");
const productLikePage = require("./productLikePage.json");
const cart = require("./cart.json");

module.exports = () => ({
	stores,
	categories,
	category1,
	product1,
	productPage1,
	productLive1,
	productLiveChar1,
	productGroups,
	productSimilar,
	productRelated,
	lastViewed,
	lastViewedPage,
	catalog,
	catalogProdCount,
	mainCategories,
	productReview,
	search,
	productLike,
	productLikePage,
	cart,
});

