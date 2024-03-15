import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';

export default function() {
  addSwatch(); 
}

 function load_image() {
    $('.card_swatch').on('click', function() {
      var thismn = $(this);
      var productId = thismn.parents('.card-swatches').attr('data-product-id');
      var attr_name = thismn.attr('data-option-id');
      var attr_val = thismn.attr('data-value-id');
      var form_data = 'action=add&attribute%5B'+ attr_name +'%5D='+ attr_val +'&product_id='+ productId +'&qty%5B%5D=1';
      utils.api.productAttributes.optionChange(productId, form_data, (err, response) => {
        if(response.data.image !== null) {
          var get_img = response.data.image.data;
          var updt_img = get_img.replace("{:size}","500x659");
          thismn.parents('.card, .listItem').find('.card-img-container .card-image, .listItem-figure__link .listItem-image').attr('src',updt_img);
          thismn.parents('.card, .listItem').find('.card-img-container .card-image, .listItem-figure__link .listItem-image').attr('srcset',updt_img);
          $(thismn).addClass('swatch-selected');
          $(thismn).siblings('.form-option').removeClass('swatch-selected');
        }
      });
    });
  }
   
function addSwatch() {
   $(document).ready(function(){
    var all_id=[];
    var tokn=$('#set_token').val();

    $('.card-swatch').each(function(){
      var id=$(this).attr('data-product-id');
      all_id.push(id);
    });
    
    fetch('/graphql', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+tokn
        },
        body: JSON.stringify({
          query: `
            query SingleProduct {
              site {
                products (entityIds: [`+all_id+`],first:50) {
                  edges {
                    node {
                      id
                      entityId
                      name
                      path
                     inventory{
                      aggregated{
                        availableToSell
                        warningLevel
                      }
                     }
                      productOptions {
                        edges {
                          node {
                            entityId
                            displayName
                              ... on MultipleChoiceOption {
                                values {
                                  edges {
                                    node {
                                      ... on SwatchOptionValue {
                                        entityId
                                        label
                                        hexColors
                                        imageUrl(width: 50, height: 50)
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `
        }),
    })
    .then(res => res.json())
    .then(json => {
    // console.log(json);
  
    for(var k in json.data.site.products.edges){
        var product_id=json.data.site.products.edges[k].node.entityId;
        
        var path=json.data.site.products.edges[k].node.path;
        var inventory;

        if(json.data.site.products.edges[k].node.inventory.aggregated)
        {
          if(json.data.site.products.edges[k].node.inventory.aggregated.availableToSell<=json.data.site.products.edges[k].node.inventory.aggregated.warningLevel)
          {
            inventory=json.data.site.products.edges[k].node.inventory.aggregated.availableToSell;

            if(inventory > 0)
            {
              $('.stock_level_'+product_id).html("<span class='warn_msg'>Only "+inventory+" left in stock!</span>");
            }
          }
          else
          {
            inventory=json.data.site.products.edges[k].node.inventory.aggregated.availableToSell;

            if(inventory > 0)
            {
              $('.stock_level_'+product_id).html("<span class='warn_msg'>"+inventory+" left in stock!</span>");
            }
          }
         
        }

        if(json.data.site.products.edges[k].node.productOptions)
        {
        for (var i in json.data.site.products.edges[k].node.productOptions.edges) {
          var displayName=(json.data.site.products.edges[k].node.productOptions.edges[i].node.displayName).toLowerCase();
          if(json.data.site.products.edges[k].node.productOptions.edges[i].node.values) {
            for(var j in json.data.site.products.edges[k].node.productOptions.edges[i].node.values.edges){
                var option_value_id=json.data.site.products.edges[k].node.productOptions.edges[i].node.values.edges[j].node.entityId;
             
                if(json.data.site.products.edges[k].node.productOptions.edges[i].node.values.edges[j].node.hexColors)
                {
                if((json.data.site.products.edges[k].node.productOptions.edges[i].node.values.edges[j].node.hexColors).length>0){
                    var div=document.createElement('div');
                    var parentDiv = document.createElement('div');
                    parentDiv.setAttribute("class", "form-option form-option-swatch");
                    parentDiv.appendChild(div);
                    div.id='color_'+option_value_id;
                    div.setAttribute('data-option-id',json.data.site.products.edges[k].node.productOptions.edges[i].node.entityId);
                    div.setAttribute('data-value-id',option_value_id);
                    div.className='card_swatch';
                    var clr_length=(json.data.site.products.edges[k].node.productOptions.edges[i].node.values.edges[j].node.hexColors).length;
                    // console.log(...json.data.site.products.edges[k].node.productOptions.edges[i].node.values.edges[j].node.hexColors);
                   // console.log(clr_length);
                   if(clr_length>1)
                   {
                    div.className='card_swatch multi_options';
                     parentDiv.className="form-option form-option-swatch form-option-multiswatch";
                   }
                   
                   for(var clr in json.data.site.products.edges[k].node.productOptions.edges[i].node.values.edges[j].node.hexColors)
                  {
                    var span=document.createElement('span');
                   span.style.background=json.data.site.products.edges[k].node.productOptions.edges[i].node.values.edges[j].node.hexColors[clr];
                   div.appendChild(span);


                  }

                    
                    $('.swatch_'+product_id).append(parentDiv);
                }
                else {
                    var div=document.createElement('div');
                    var parentDiv = document.createElement('div');
                    parentDiv.setAttribute("class", "form-option form-option-swatch");
                    parentDiv.appendChild(div);
                    div.style.backgroundImage="url("+json.data.site.products.edges[k].node.productOptions.edges[i].node.values.edges[j].node.imageUrl+")";
                    div.id='color_'+option_value_id;
                    div.setAttribute('data-option-id',json.data.site.products.edges[k].node.productOptions.edges[i].node.entityId);
                    div.setAttribute('data-value-id',option_value_id);
                    div.className='card_swatch';
                    $('.swatch_'+product_id).append(parentDiv);
                }
              }
            }
          }
        }
      }
    }
  
    $('.card-swatches').each(function() {
      $(this).children().each(function(index) {
        if(index > 5)
        {
          $(this).hide();
        }
      });

      if($(this).children().length > 5) {
        $(this).append("<a href='"+$(this).attr('data-url')+"' class='lable-more-card'>+more</a>")
      }
    });
    load_image();
  });
           
  });
}




