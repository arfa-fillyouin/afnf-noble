import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';

export default function() {
	$('.card, .listItem').each(function() {
		var $product = $(this);
		var productId = $("[data-product-id]", $product).data("productId");
		if (productId != undefined) {
			// utils.api.product.getById(productId, { template: 'custom/stock-level-on-category' }, (err, get_stockleve_html) => {
			// 	$product.find('[card-stock-level]').html(get_stockleve_html);
			// });
		}
	});
}
