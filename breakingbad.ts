const { Scraper, Root, CollectContent } = require('nodejs-web-scraper');

const breakingbad = async (name: String)  => {
    try{
        const config = {
            baseSiteUrl: `https://www.trovaprezzi.it/prezzo_altri-videogiochi_${name.split(' ').join('_')}.aspx`,
            startUrl: `https://www.trovaprezzi.it/prezzo_altri-videogiochi_${name.split(' ').join('_')}.aspx`
        }
        const scraper = new Scraper(config);

        const root = new Root();
        const base_price = new CollectContent('div.item_basic_price', { name: 'base_price' });
        const shipping_price = new CollectContent('div.item_delivery_price ', { name: 'shipping_price' });
        const total_price = new CollectContent('div.item_total_price', { name: 'total_price' });
        const merchant_name = new CollectContent('span.merchant_name', { name: 'merchant' });

        root.addOperation(base_price);
        root.addOperation(shipping_price);
        root.addOperation(total_price);
        root.addOperation(merchant_name);

        await scraper.scrape(root);
    
        const articles = root.getData();
        
        const finalArticles = [];

        for(let idx in articles.data[0].data){
            let article = {
                'base_price': articles.data[0].data[idx],
                'shipping_price': articles.data[1].data[idx],
                'total_price': articles.data[2].data[idx],
                'merchant_name': articles.data[3].data[idx]
            };
            finalArticles.push(article);
        }
    
        return finalArticles;
        
    }catch(ex){
        console.log(ex);
    }
   

};    

export default breakingbad;