import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LetterFilter from './letterFilter';
import { getMenus, searchMenu, getDefaultMenus } from '../actions/index';
import Menu from '../components/menu';

const MenuList = ({
  getTheMenus, menus, filterMenu, getDefaultMenus,
}) => {
  useEffect(() => {
    getDefaultMenus();
  }, [getDefaultMenus]);

  const handleFilterChange = value => (value.toLowerCase() === 'all' ? getTheMenus() : filterMenu(value));

  return menus === null ? (
    <h1>Loading...</h1>
  ) : (
    <section className="section">
      <div>
        <LetterFilter handleChange={handleFilterChange} />
      </div>
      <h2 className="section-title">Our Menu</h2>
      <div />
      <div className="underline" />
      <div className="meals-center">
        {menus.map(menu => (
          <Menu menu={menu} key={menu.idMeal} />
        ))}
      </div>
    </section>
  );
};

MenuList.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.object).isRequired,
  getTheMenus: PropTypes.func.isRequired,
  filterMenu: PropTypes.func.isRequired,
  getDefaultMenus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  menus: state.menus.menus,
  filter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  getTheMenus: () => dispatch(getMenus()),
  filterMenu: letter => dispatch(searchMenu(letter)),
  getDefaultMenus: () => dispatch(getDefaultMenus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
