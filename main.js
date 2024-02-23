import pizzas from './pizzas.js';
import orders from './orders.js';

// 1. Combien de recettes de pizzas sont à base de tomate.
const counTomatoPizza = pizzas.filter(pizza => pizza.base === "Tomate").length;

console.log(counTomatoPizza);

// 2. Quel est le montant de la 1ère commande ?
const firstOrderAmount = orders[0].items.reduce((total, item) => {
  const pizza = pizzas.find(pizza => pizza.id === item.pizzaId);
  return total + (pizza ? pizza.price * item.quantity : 0);
}, 0);

console.log(firstOrderAmount);

// 3. Combien de recettes de pizza comptent moins de 4 ingrédients ?
const countPizzaLess4Ingredient = pizzas.filter(pizza => pizza.ingredients.length < 4).length;

console.log(countPizzaLess4Ingredient);

// 4. Quel est le montant total des ventes de pizzas ?
const totalAmountSales = orders.reduce((total, order) => {
  return total + order.items.reduce((orderTotal, item) => {
    const pizza = pizzas.find(pizza => pizza.id === item.pizzaId);
    return orderTotal + (pizza ? pizza.price * item.quantity : 0);
  }, 0);
}, 0);

console.log(totalAmountSales);

// 5. Quel est le montant moyen des commandes de pizzas ?
const averageAmountOrder = totalAmountSales / orders.length;

console.log(averageAmountOrder);

// 6. Combien de recettes de pizzas ne contiennent pas de viande ?
const countVegiePizzas = pizzas.filter(pizza => pizza.ingredients.every(ingredient => !ingredient.includes("Jambon") && !ingredient.includes("Saucisson"))).length;

console.log(countVegiePizzas);

// 7. Quelle recette de pizza a été la plus vendue ?
const mostSoldPizza = orders.flatMap(order => order.items.map(item => item.pizzaId))
  .reduce((acc, pizzaId) => {
    acc[pizzaId] = (acc[pizzaId] || 0) + 1;
    return acc;
  }, {});

const mostSoldPizzaId = Object.keys(mostSoldPizza).reduce((a, b) => mostSoldPizza[a] > mostSoldPizza[b] ? a : b);

const mostSoldPizzaName = pizzas.find(pizza => pizza.id === mostSoldPizzaId).name;

console.log(mostSoldPizzaName);

// 8. Quel est le nombre moyen de pizzas commandées ?
const totalOrderedPizzas = orders.reduce((total, order) => total + order.items.length, 0);
const averagePizzasOrdered = totalOrderedPizzas / orders.length;

console.log(averagePizzasOrdered);

// 9. Combien de recettes de pizzas ont été commandées une seule fois ?
const uniqueOrderedPizzasCount = Object.values(mostSoldPizza).filter(count => count === 1).length;

console.log(uniqueOrderedPizzasCount);

// 10. Combien de bases différentes de pizzas compte le menu ?
const uniquePizzaBasesCount = pizzas.reduce((bases, pizza) => {
  if (!bases.includes(pizza.base)) {
    bases.push(pizza.base);
  }
  return bases;
}, []).length;

console.log(uniquePizzaBasesCount);

// 11. Quelle est l'ingrédient le plus utilisé dans les recettes de pizzas ?
const ingredientsCount = pizzas.flatMap(pizza => pizza.ingredients)
  .reduce((acc, ingredient) => {
    acc[ingredient] = (acc[ingredient] || 0) + 1;
    return acc;
  }, {});

const mostUsedIngredient = Object.keys(ingredientsCount).reduce((a, b) => ingredientsCount[a] > ingredientsCount[b] ? a : b);

console.log(mostUsedIngredient);