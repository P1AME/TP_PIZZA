import pizzas from './pizzas.js';
import orders from './orders.js';

// 1. Combien de recettes de pizzas sont à base de tomate.
const counTomatoPizza = (pizzas) => {
  return pizzas.filter(pizza => pizza.base === "Tomate").length;
};

console.log(counTomatoPizza(pizzas));

// 2. Quel est le montant de la 1ère commande ?
const firstOrderAmount = (orders) => {
  return orders[0].items.reduce((total, item) => {
    const pizza = pizzas.find(pizza => pizza.id === item.pizzaId);
    return total + (pizza ? pizza.price * item.quantity : 0);
  }, 0);
};

console.log(firstOrderAmount(orders));

// 3. Combien de recettes de pizza comptent moins de 4 ingrédients ?
const countPizzaLess4Ingredient = (pizzas) => {
  return pizzas.filter(pizza => pizza.ingredients.length < 4).length;
};

console.log(countPizzaLess4Ingredient(pizzas));

// 4. Quel est le montant total des ventes de pizzas ?
const totalAmountSales = (orders) => {
  return orders.reduce((total, order) => {
    return total + order.items.reduce((orderTotal, item) => {
      const pizza = pizzas.find(pizza => pizza.id === item.pizzaId);
      return orderTotal + (pizza ? pizza.price * item.quantity : 0);
    }, 0);
  }, 0);
};

console.log(totalAmountSales(orders));

// 5. Quel est le montant moyen des commandes de pizzas ?
const averageAmountOrder = (totalAmountSales) => totalAmountSales / orders.length;

console.log(averageAmountOrder(totalAmountSales(orders)));

// 6. Combien de recettes de pizzas ne contiennent pas de viande ?
const countVegiePizzas = (pizzas) => pizzas.filter(pizza => pizza.ingredients.every(ingredient => !ingredient.includes("Jambon") && !ingredient.includes("Saucisson"))).length;

console.log(countVegiePizzas(pizzas));

// 7. Quelle recette de pizza a été la plus vendue ?
const mostSoldPizza = (orders) => {
  return orders.flatMap(order => order.items.map(item => item.pizzaId))
    .reduce((acc, pizzaId) => {
      acc[pizzaId] = (acc[pizzaId] || 0) + 1;
      return acc;
    }, {});
};

const getMostSoldPizzaId = (mostSoldPizza) => {
  return Object.keys(mostSoldPizza).reduce((a, b) => mostSoldPizza[a] > mostSoldPizza[b] ? a : b);
};

const mostSoldPizzaName = (mostSoldPizzaId) => pizzas.find(pizza => pizza.id === mostSoldPizzaId).name;

console.log(mostSoldPizzaName(getMostSoldPizzaId(mostSoldPizza(orders))));

// 8. Quel est le nombre moyen de pizzas commandées ?
const totalOrderedPizzas = (orders) => orders.reduce((total, order) => total + order.items.length, 0);
const averagePizzasOrdered = (total, orders) => total / orders.length;

console.log(averagePizzasOrdered(totalOrderedPizzas(orders), orders));


// 9. Combien de recettes de pizzas ont été commandées une seule fois ?
const uniqueOrderedPizzasCount = (mostSoldPizza) => Object.values(mostSoldPizza).filter(count => count === 1).length;

console.log(uniqueOrderedPizzasCount(mostSoldPizza(orders)));

// 10. Combien de bases différentes de pizzas compte le menu ?
const uniquePizzaBasesCount = (pizzas) => (pizzas.reduce((bases, pizza) => {
  if (!bases.includes(pizza.base)) {
    bases.push(pizza.base);
  }
  return bases;
}, []).length);

console.log(uniquePizzaBasesCount(pizzas));

// 11. Quelle est l'ingrédient le plus utilisé dans les recettes de pizzas ?
const ingredientsCount = (pizzas) => pizzas.flatMap(pizza => pizza.ingredients)
  .reduce((acc, ingredient) => {
    acc[ingredient] = (acc[ingredient] || 0) + 1;
    return acc;
  }, {});

const mostUsedIngredient = (iC) => Object.keys(iC).reduce((a, b) => ingredientsCount[a] > ingredientsCount[b] ? a : b);

console.log(mostUsedIngredient(ingredientsCount(pizzas)));