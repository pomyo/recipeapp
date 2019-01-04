import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

const Heading = () => (
    <div className='lobster-font'>
        <h1><i className="fas fa-utensils"></i>RecipeApp</h1>
    </div>
)

const DetailView = (props) => (
    <div className='details'>
        <div className='recipe-name'><h1>{props.detail.name.toUpperCase()}</h1></div>

        <h3>INGREDIENTS</h3>
        <h3>INSTRUCTIONS</h3>
        <ul>
            {props.detail.ingredients.map( ingredient => (
                <li>{ingredient}</li> )        
            )}
        </ul>
        <ul>
            {props.detail.instructions.map( instruction => (
                <li>{instruction}</li>
            ))}
        </ul>
    </div>
)

const DirectoryView = (props) => (
    <div className='directory'>
        <SearchForm 
            handleChange={props.handleChange}
            searchValue={props.searchValue} 
            selectRecipes={props.selectRecipes}
        />

        {props.recipes.map( recipe => (
            <RecipeCard 
                renderDetails={props.renderDetails} 
                name={recipe.name} 
                key={recipe.id}
            />
        ))}
    </div>
);

const SearchForm = (props) => (
    <form>
        <input 
            onChange={props.handleChange} 
            value={props.searchValue}
            placeholder='Search Text Here'
        />

        <button onClick={props.selectRecipes}>SEARCH</button>
    </form>
);

const RecipeCard = (props) => (
    <div onClick={props.renderDetails} className='recipeName'>{props.name.toUpperCase()}</div>
);


class App extends React.Component {
    state = {
        recipes: [
            {
                id: 1,
                name: 'turkey + stuff',
                ingredients: ['turkey', 'mustard', 'greens', 'celery', 'potato'],
                instructions: ['pre-heat over to 350', 'tickle the turkey', 'cut some celery']
            },
            {
                id: 2,
                name: 'turkey + stuff',
                ingredients: ['turkey', 'mustard', 'greens', 'celery', 'potato'],
                instructions: ['pre-heat over to 350', 'tickle the turkey', 'cut some celery']
            },
            {
                id: 3,
                name: 'turkey + stuff',
                ingredients: ['turkey', 'mustard', 'greens', 'celery', 'potato'],
                instructions: ['pre-heat over to 350', 'tickle the turkey', 'cut some celery']
            },
            {
                id: 4,
                name: 'turkey + stuff',
                ingredients: ['turkey', 'mustard', 'greens', 'celery', 'potato'],
                instructions: ['pre-heat over to 350', 'tickle the turkey', 'cut some celery']
            },
            {
                id: 5,
                name: 'turkey + stuff',
                ingredients: ['turkey', 'mustard', 'greens', 'celery', 'potato'],
                instructions: ['pre-heat over to 350', 'tickle the turkey', 'cut some celery']
            },
            {
                id: 6,
                name: 'mac and cheese',
                ingredients: ['turkey', 'mustard', 'greens', 'celery', 'potato'],
                instructions: ['pre-heat over to 350', 'tickle the turkey', 'cut some celery']
            },
            {
                id: 7,
                name: 'turkey + stuff',
                ingredients: ['turkey', 'mustard', 'greens', 'celery', 'potato'],
                instructions: ['pre-heat over to 350', 'tickle the turkey', 'cut some celery']
            },
            {
                id: 8,
                name: 'tester',
                ingredients: ['test', 'test', 'testtest', 'test', 'potato'],
                instructions: ['pre-heat over to 350', 'tickle the turkey', 'cut some celery']
            },
            {
                id: 9,
                name: 'test + stuff',   
                ingredients: ['turkey', 'mustard', 'greens', 'celery', 'potato'],
                instructions: ['pre-heat over to 350', 'tickle the turkey', 'cut some celery']
            }

        ],
        searchVal: '',
        selectedRecipes: [],
        selectedDetails: null
    }

    selectRecipes = (event) => {
        event.preventDefault();
        let selected = this.state.recipes.filter( recipe => 
            recipe.name.toUpperCase().includes(this.state.searchVal.toUpperCase())
        )
        if(selected.length > 0) {
            this.setState({selectedRecipes: selected, selectedDetails: selected[0]});
        }

    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({searchVal: event.target.value});
    }

    renderDetails = (event) => {
        event.preventDefault();
        let recipeName = event.target.innerHTML;
        console.log(recipeName); 
        let details = this.state.recipes.filter( recipe => 
            recipe.name.toUpperCase() === recipeName.toUpperCase()
        )

        if(details.length > 0) {
            this.setState({selectedDetails: details[0]});
        }
    }

    render() {
        let details;

        if (this.state.selectedDetails != null) 
            details = <DetailView detail={this.state.selectedDetails} />
        else 
            details = null;
            
        return (
            <div>
                <Heading />
                <DirectoryView 
                    renderDetails={this.renderDetails}
                    recipes={this.state.selectedRecipes} 
                    handleChange={this.handleChange} 
                    searchValue={this.state.searchVal} 
                    selectRecipes={this.selectRecipes} />
                {details}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
