// Copyright 2021 VMware
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package v1alpha1

import (
	"fmt"
	"reflect"
	"strings"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/util/jsonpath"
)

func validateResourceOptions(options []TemplateOption, validPaths map[string]bool, validPrefixes []string) error {
	for _, option := range options {
		if err := validateFieldSelectorRequirements(option.Selector.MatchFields, validPaths, validPrefixes); err != nil {
			return fmt.Errorf("error validating option [%s]: %w", option.Name, err)
		}
	}

	for _, option1 := range options {
		for _, option2 := range options {
			if option1.Name != option2.Name && reflect.DeepEqual(option1.Selector, option2.Selector) {
				return fmt.Errorf(
					"duplicate selector found in options [%s, %s]",
					option1.Name,
					option2.Name,
				)
			}
		}
	}

	return nil
}

func validateFieldSelectorRequirements(reqs []FieldSelectorRequirement, validPaths map[string]bool, validPrefixes []string) error {
	for _, req := range reqs {
		switch req.Operator {
		case FieldSelectorOpExists, FieldSelectorOpDoesNotExist:
			if len(req.Values) != 0 {
				return fmt.Errorf("cannot specify values with operator [%s]", req.Operator)
			}
		case FieldSelectorOpIn, FieldSelectorOpNotIn:
			if len(req.Values) == 0 {
				return fmt.Errorf("must specify values with operator [%s]", req.Operator)
			}
		default:
			return fmt.Errorf("operator [%s] is invalid", req.Operator)
		}

		if !validPath(req.Key, validPaths, validPrefixes) {
			return fmt.Errorf("requirement key [%s] is not a valid path", req.Key)
		}

		if err := validJsonpath(req.Key); err != nil {
			return fmt.Errorf("invalid jsonpath for key [%s]: %w", req.Key, err)
		}
	}
	return nil
}

func validJsonpath(path string) error {
	parser := jsonpath.New("")

	return parser.Parse(path)
}

func validPath(path string, validPaths map[string]bool, validPrefixes []string) bool {
	if validPaths[path] {
		return true
	}

	for _, prefix := range validPrefixes {
		if strings.HasPrefix(path, prefix) {
			return true
		}
	}

	return false
}

func validateSelectors(selectors Selectors, validPaths map[string]bool, validPrefixes []string) error {
	var err error

	labelSelector := &metav1.LabelSelector{
		MatchLabels: selectors.Selector,
	}

	_, err = metav1.LabelSelectorAsSelector(labelSelector)
	if err != nil {
		return fmt.Errorf("selector is not valid: %w", err)
	}

	labelSelector = &metav1.LabelSelector{
		MatchExpressions: selectors.SelectorMatchExpressions,
	}

	_, err = metav1.LabelSelectorAsSelector(labelSelector)
	if err != nil {
		return fmt.Errorf("selectorMatchExpressions are not valid: %w", err)
	}

	if len(selectors.SelectorMatchFields) != 0 {
		err = validateFieldSelectorRequirements(selectors.SelectorMatchFields, validPaths, validPrefixes)
		if err != nil {
			return err
		}
	}

	return nil
}
